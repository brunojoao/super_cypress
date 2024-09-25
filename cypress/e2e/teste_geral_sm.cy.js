describe('template spec', () => {
  it('passes', () => {
    const BASE_URL = 'http://sm-hkm.docker.local:8080'

    // LOGIN
    cy.visit(BASE_URL)

    cy.get('input[name="username"]').type('administrador')

    cy.get('input[name="password"]').type('789123')

    cy.get('button[type="submit"]').click()

    // IMPORTAR REPORTES
    cy.visit(`${BASE_URL}/receita/importar`)

    cy.get('button#receita_register').click()

    cy.get('input#checkboxVarejo').check()

    const cyGetModalPacienteRec = cy.get('input#modalPacienteRec')
    cyGetModalPacienteRec.type('TESTE')
    cy.wait(2000)
    cyGetModalPacienteRec.type('{downarrow}').type('{enter}')
  })
})
