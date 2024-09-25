const BASE_URL = "http://sm-hkm.docker.local:8080";
const TIMEOUT = 10000;

const LOGIN = "administrador";
const SENHA = "789123";

describe("Teste geral", () => {
  it("Registrar receita", () => {
    // LOGIN
    cy.visit(BASE_URL);
    cy.get('input[name="username"]').type(LOGIN);
    cy.get('input[name="password"]').type(SENHA);
    cy.get('button[type="submit"]').click();

    // IMPORTAR RECEITAS
    cy.visit(`${BASE_URL}/receita/importar`);
    cy.get("button#receita_register").click();
    cy.get("input#checkboxVarejo").check();

    // Escolhe paciente
    // Espera o autocomplete aparecer, então pressiona a seta para baixo e enter
    cy.get("input#modalPacienteRec", { timeout: TIMEOUT }).type("TESTE");
    cy.get("div.autocomplete-suggestion", { timeout: TIMEOUT })
      .should("be.visible")
      .then(() => {
        // Agora que o autocomplete está visível, envia as teclas para o mesmo input
        cy.get("input#modalPacienteRec")
          .type("{downarrow}")
          .type("{downarrow}")
          .type("{enter}");
      });

    // Aguarda até 10 segundos pelo botão primário aparecer
    cy.get("div.bootbox button.btn-primary", { timeout: TIMEOUT }).click();

    // Aguarda até 10 segundos pelo botão "apply"
    cy.get("button#apply-cel-btn", { timeout: TIMEOUT }).click();

    // Escolhe canal de contato
    cy.get("select#modalCanalContato", { timeout: TIMEOUT }).select("1");

    // Escolhe paciente
    // Espera o autocomplete aparecer, então pressiona a seta para baixo e enter
    cy.get("input#modalAtendenteRec", { timeout: TIMEOUT }).type("TESTE");
    cy.get("div.autocomplete-suggestion", { timeout: TIMEOUT })
      .should("be.visible")
      .then(() => {
        // Agora que o autocomplete está visível, envia as teclas para o mesmo input
        cy.get("input#modalAtendenteRec")
          .type("{downarrow}")
          .type("{downarrow}")
          .type("{enter}");
      });

    // Escolhe a data de recebimento
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Subtrai um dia da data atual
    const formattedDate = yesterday.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM

    cy.get("input#modalDataRec").invoke("val", formattedDate).trigger("change");

    //escolhe o cluster
    const randomValue = Math.floor(Math.random() * 8) + 1; // Gera um número aleatório entre 1 e 8
    cy.get("select#modalCluster", { timeout: TIMEOUT }).select(
      randomValue.toString(),
    ); // Converte o valor para string

    // escolhe o tipo de receita
    cy.get("input[name=receita_tipo][value='2']", { timeout: TIMEOUT }).check();

    //OBS
    cy.get("div.note-editor div.note-editable").first().type("TESTE - GERADO COM CYPRESS");

    // salva a receita
    cy.get("button#save_receita").click();

    //confirma o ok
    cy.get("div.bootbox button.btn-primary", { timeout: TIMEOUT }).click();
  });
});
