import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/",
  "/en",
  "/projetos/telabrasil",
  "/projetos/cultbr",
  "/projetos/oraculo",
  "/en/projects/telabrasil",
  "/en/projects/cultbr",
  "/en/projects/oraculo",
];

test.describe("rendering", () => {
  for (const path of pages) {
    test(`renders ${path} with a single h1 and no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }

  test("home answers the 30-second questions above the fold", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("decisão");
    await expect(page.getByText("Produto Digital · Engenharia de Requisitos · IA Aplicada")).toBeVisible();
    await expect(page.getByRole("link", { name: "Explorar projetos" })).toBeInViewport();
  });

  test("english home has natural copy and lang attribute", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Between the problem and the code");
  });

  test("unknown route returns 404", async ({ page }) => {
    const res = await page.goto("/nao-existe");
    expect(res?.status()).toBe(404);
  });
});

test.describe("content rules in production", () => {
  for (const path of pages) {
    test(`no pending or restricted content on ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("[data-pending]")).toHaveCount(0);
      const html = await page.content();
      expect(html).not.toContain("TF-IDF");
      expect(html).not.toContain("gitlab.ufal.br");
      expect(html).not.toMatch(/\(82\)|9\.9660/);
    });
  }

  test("JSON-LD describes the degree as in progress (no alumniOf)", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw!);
    expect(JSON.stringify(data)).not.toContain("alumniOf");
    expect(JSON.stringify(data)).toContain("2028");
  });
});

test.describe("interactions", () => {
  test("decision trace shows the expanded decision", async ({ page }) => {
    await page.goto("/projetos/oraculo");
    const first = page.locator("#decisoes").getByRole("button", { name: /Sugerir, não decidir/ });
    await first.scrollIntoViewIfNeeded();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("A ferramenta acelera a análise")).toBeVisible();
    await page.getByRole("button", { name: "Expandir todas" }).click();
    await expect(page.getByText("Usar uma só perde os casos")).toBeVisible();
  });

  test("triage walkthrough advances step by step", async ({ page }) => {
    await page.goto("/projetos/oraculo");
    const next = page.getByRole("button", { name: "Próximo" });
    await next.scrollIntoViewIfNeeded();
    await next.click();
    await expect(page.getByText("Duas buscas, uma por palavra e outra por significado")).toBeVisible();
    for (let i = 0; i < 3; i++) await next.click();
    await expect(page.getByText("Uma pessoa decide")).toBeVisible();
    await expect(next).toBeDisabled();
  });

  test("evidence link opens the matching experience", async ({ page }) => {
    await page.goto("/");
    await page.locator("#competencias").getByRole("link", { name: "Phicoding" }).first().click();
    const item = page.locator("#exp-phicoding");
    await expect(item.getByRole("button").first()).toHaveAttribute("aria-expanded", "true");
    await expect(item.getByText(/Conduzi a entrega do MVP do KADIN/)).toBeVisible();
  });

  test("skills map links a skill to the projects that prove it", async ({ page }) => {
    await page.goto("/");
    const chip = page.locator("#competencias").getByRole("button", { name: /Gestão e refinamento de backlog/ });
    await chip.scrollIntoViewIfNeeded();
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("Comprovada em: TelaBrasil, Phicoding, SPTE")).toBeVisible();
    await page.getByRole("button", { name: "Limpar seleção" }).click();
    await expect(chip).toHaveAttribute("aria-pressed", "false");
  });

  test("cycle tabs switch the relation with the keyboard", async ({ page }) => {
    await page.goto("/");
    const tab = page.getByRole("tab", { name: "decisão" });
    await tab.focus();
    await page.keyboard.press("Home");
    await expect(page.getByRole("tab", { name: /Negócio → Produto/ })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Necessidade vira problema priorizado")).toBeVisible();
  });

  test("copy email gives feedback", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    const btn = page.getByTestId("copy-email");
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await expect(page.getByTestId("toast")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("leolucca1998@gmail.com");
  });

  test("CV, sitemap, robots and Open Graph image are served", async ({ page, request }) => {
    await page.goto("/");
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    const ogPath = new URL(og!).pathname;
    for (const p of ["/curriculo-leonardo-lucca.pdf", "/sitemap.xml", "/robots.txt", ogPath]) {
      const r = await request.get(p);
      expect(r.status(), p).toBe(200);
    }
  });

  test("skip link is the first tab stop and moves focus to content", async ({ page }, info) => {
    test.skip(info.project.name === "mobile");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });
});

test.describe("motion and layout", () => {
  test.use({ reducedMotion: "reduce" });

  test("reduced motion shows content without transforms", async ({ page }) => {
    await page.goto("/");
    const el = page.locator("[data-reveal]").nth(5);
    await el.scrollIntoViewIfNeeded();
    const style = await el.evaluate((n) => {
      const s = getComputedStyle(n);
      return { opacity: s.opacity, transform: s.transform };
    });
    expect(style.opacity).toBe("1");
    expect(style.transform).toBe("none");
  });

  for (const path of pages) {
    test(`no horizontal overflow on ${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("accessibility", () => {
  test.use({ reducedMotion: "reduce" });
  for (const path of pages) {
    test(`axe: no serious violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
    });
  }
});
