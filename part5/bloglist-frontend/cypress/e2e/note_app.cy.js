describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Agustin Peres',
      username: 'agustin',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('[placeholder=username]').type('agustin');
      cy.get('[placeholder=password]').type('password');
      cy.get('#login-button').click();
      cy.contains('Agustin Peres logged-in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('[placeholder=username]').type('wrong');
      cy.get('[placeholder=password]').type('something');
      cy.get('#login-button').click();

      cy.contains('Wrong username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );

      cy.get('html').should('not.contain', 'Agustin Peres logged-in');
    });
  });
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'agustin', password: 'password' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('[placeholder=title]').type('a new blog added by cypress');
      cy.get('[placeholder=author]').type('great author');
      cy.get('[placeholder=url]').type('some topic');
      cy.contains('create').click();
      cy.contains('a new blog added by cypress');
    });

    it('A blog can be liked', function () {
      cy.contains('new blog').click();
      cy.createBlog({
        title: 'a new blog added by cypress',
        author: 'great author',
        url: 'some topic',
      });
      cy.contains('view').click();
      cy.get('.likeBtn').click();
      cy.get('[data-test-id=number-likes] span').should('contain', '1');
    });
    it('a user can delete its own blog', function () {
      cy.createBlog({
        title: 'a new blog added by cypress',
        author: 'great author',
        url: 'some topic',
      });
      cy.contains('view').click();
      cy.contains('remove').click();
      cy.get('html').should('not.contain', 'a new blog added by cypress');
    });

    describe('blogs are ordered according to the likes', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog added by cypress',
          author: 'great author',
          url: 'some topic',
        });
        cy.createBlog({
          title: 'second blog added by cypress',
          author: 'great author',
          url: 'some topic',
        });
        cy.createBlog({
          title: 'third blog added by cypress',
          author: 'great author',
          url: 'some topic',
        });
      });
      it('blogs are ordered according to the likes', function () {
        cy.get('.blog').eq(2).contains('view').click();
        cy.get('.blog').eq(2).contains('like').click();
        cy.get('.blog').eq(2).contains('like').click();
      });
    });
  });
});
