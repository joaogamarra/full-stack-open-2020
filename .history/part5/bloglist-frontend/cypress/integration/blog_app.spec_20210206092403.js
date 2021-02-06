describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen',
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('username')
		cy.contains('password')
		cy.get("input[name='Username']")
		cy.get("input[name='Password']")

		describe('Login', function () {
			it('succeeds with correct credentials', function () {
				cy.get('#username').type('mluukkai')
				cy.get('#password').type('salainen')
				cy.get('#login-btn').click()

				cy.contains('Matti Luukkainen logged-in')
			})

			it('fails with wrong credentials', function () {
				cy.get('#username').type('wrong')
				cy.get('#password').type('wrong')

				cy.get('.error').contains('wrong username or password')
			})
		})
	})
})
