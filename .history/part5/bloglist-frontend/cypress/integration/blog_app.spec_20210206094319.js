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
	})

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
			cy.get('#login-btn').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(128, 4, 4)')
		})
	})

	describe.only('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'mluukkai', password: 'salainen' })
		})

		it('A blog can be created', function () {
			cy.contains('new blog').click()
			cy.get('#blog-title').type('a title created by cypress')
			cy.get('#blog-author').type('a author created by cypress')
			cy.get('#blog-url').type('http://url created by cypress')
			cy.contains('save').click()
			cy.contains('a title created by cypress')
		})

		it('A blog can be liked', function () {
			cy.contains('view').click()
			cy.contains('Add Like').click()

			cy.contains('likes 1')
		})
	})
})
