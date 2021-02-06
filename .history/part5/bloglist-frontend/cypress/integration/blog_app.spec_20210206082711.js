describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('username').and.contains('password')
		cy.get("input[name='username']")
		cy.get("input[name='password']")
	})
})
