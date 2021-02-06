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

	describe('When logged in', function () {
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

		describe('when a blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'a title created by cypress',
					author: 'a author created by cypress',
					url: 'http://url created by cypress',
				})
			})

			it('A blog can be liked', function () {
				cy.contains('View').click()
				cy.contains('Add Like').click()

				cy.contains('likes 1')
			})

			it('A blog can be deleted by the user', function () {
				cy.contains('View').click()
				cy.contains('Remove')
			})
		})

		describe.only('when multiples blogs exist', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'a title created by cypress 1',
					author: 'a author created by cypress 1',
					url: 'http://url created by cypress 1',
				})

				cy.createBlog({
					title: 'a title created by cypress 2',
					author: 'a author created by cypress 2',
					url: 'http://url created by cypress 2',
				})

				cy.createBlog({
					title: 'a title created by cypress 3',
					author: 'a author created by cypress 3',
					url: 'http://url created by cypress 3',
				})
			})

			it('blogs order', function () {
				cy.get('.blog-item').eq(0).as('item0')
				cy.get('.blog-item').eq(1).as('item1')
				cy.get('.blog-item').eq(2).as('item2')

				cy.get('@item0').contains('View').click()
				cy.get('@item0').contains('Add Like').click()

				cy.get('@item1').contains('View').click()
				cy.get('@item1').contains('Add Like').click()
				cy.get('@item1').contains('Add Like').click()
				cy.get('@item1').contains('Add Like').click()
				cy.get('@item1').contains('Add Like').click()

				cy.get('@item2').contains('View').click()
				cy.get('@item2').contains('Add Like').click()
				cy.get('@item2').contains('Add Like').click()
				cy.get('@item2').contains('Add Like').click()

				cy.get('.blog-item').eq(0).contains('a title created by cypress 2')
				cy.get('.blog-item').eq(2).contains('a title created by cypress 1')
			})
		})
	})
})
