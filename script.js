function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  let html = "";
  let inList = false;

  const flushList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("### ")) {
      flushList();
      html += `<h3>${escapeHtml(line.slice(4))}</h3>`;
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      html += `<h2>${escapeHtml(line.slice(3))}</h2>`;
      continue;
    }

    if (line.startsWith("# ")) {
      flushList();
      html += `<h1>${escapeHtml(line.slice(2))}</h1>`;
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMd(escapeHtml(line.slice(2)))}</li>`;
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMd(escapeHtml(line.replace(/^\d+\.\s/, "")))}</li>`;
      continue;
    }

    if (line === "---") {
      flushList();
      html += "<hr/>";
      continue;
    }

    if (line === "") {
      flushList();
      continue;
    }

    flushList();
    html += `<p>${inlineMd(escapeHtml(line))}</p>`;
  }

  flushList();
  return html;
}

function inlineMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function init() {
  const el = document.getElementById("content");
  try {
    const resp = await fetch("./content/InnerFire_Product_Overview_EN.md", { cache: "no-store" });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const md = await resp.text();
    el.innerHTML = mdToHtml(md);
  } catch (err) {
    el.textContent = `Failed to load markdown: ${String(err)}`;
  }
}

init();
