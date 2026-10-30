// Efeito de luz que acompanha o ponteiro; em dispositivos touch, mantém o fundo simples.
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", (event) => {
        document.body.style.setProperty("--mouse-x", `${event.clientX}px`);
        document.body.style.setProperty("--mouse-y", `${event.clientY}px`);
    });
}

const cards = document.querySelectorAll("[data-painel]");
const paineis = document.querySelectorAll(".projeto");
const backdrop = document.querySelector("[data-fechar-painel]");
let painelAtual = null;
let elementoAnterior = null;

function abrirPainel(painel, card) {
    if (!painel) return;

    fecharPainel(false);
    painelAtual = painel;
    elementoAnterior = card;

    backdrop.hidden = false;
    painel.classList.add("aberto");
    painel.setAttribute("aria-hidden", "false");
    painel.inert = false;
    card.setAttribute("aria-expanded", "true");
    document.body.classList.add("painel-aberto");

    const botaoFechar = painel.querySelector(".fechar-projeto");
    if (botaoFechar) botaoFechar.focus();
}

function fecharPainel(restaurarFoco = true) {
    if (!painelAtual) return;

    const painelFechado = painelAtual;
    painelFechado.classList.remove("aberto");
    painelFechado.setAttribute("aria-hidden", "true");
    painelFechado.inert = true;

    cards.forEach((card) => {
        if (card.dataset.painel === painelFechado.id) {
            card.setAttribute("aria-expanded", "false");
        }
    });

    painelAtual = null;
    backdrop.hidden = true;
    document.body.classList.remove("painel-aberto");

    if (restaurarFoco && elementoAnterior) elementoAnterior.focus();
    elementoAnterior = null;
}

cards.forEach((card) => {
    const ativarCard = () => {
        const painel = document.getElementById(card.dataset.painel);
        abrirPainel(painel, card);
    };

    card.addEventListener("click", ativarCard);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            ativarCard();
        }
    });
});

paineis.forEach((painel) => {
    const botaoFechar = painel.querySelector(".fechar-projeto");
    botaoFechar?.addEventListener("click", () => fecharPainel());
});

backdrop?.addEventListener("click", () => fecharPainel());

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && painelAtual) fecharPainel();
});
