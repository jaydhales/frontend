describe('Check All Wallet Pages Work', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });
  it('should connect wallet with success', () => {
    cy.xpath('//*[@id="connectButton"]/div/button').click()
    cy.acceptMetamaskAccess();
    cy.get('#connectButton').should(
      'have.text',
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    );
  });

  /**
   *
   * Setup your test flow
   *
   */
});
