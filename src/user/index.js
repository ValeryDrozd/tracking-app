import { ajax } from 'rxjs/ajax';

export function login() {
  ajax
    .post('http://localhost:5000/login', {
      email: this.email,
      password: this.password,
    })
    .subscribe((res) => {
      if (res.response.user) {
        localStorage.setItem('loginId', res.response.user.id);
        this.$router.replace({ path: '/' });
        location.reload();
      } else {
        localStorage.setItem('loginId', '');
        this.error = res.response.status + '. ' + res.response.message;
      }
    });
}

export function register() {
  ajax
    .post('http://localhost:5000/register', {
      name: this.name,
      email: this.email,
      password: this.password,
    })
    .subscribe(
      (res) => {
        if (res.response.user) {
          localStorage.setItem('loginId', res.response.user.id);
          this.$router.replace({ path: '/' });
          location.reload();
        } else {
          localStorage.setItem('loginId', '');
          this.error = res.response.status + '. ' + res.response.message;
        }
      }
    );
}

export function addcompany() {
  ajax
    .post('http://localhost:5000/addcompany', {
      text: this.symbol,
      search: this.search,
      userid: localStorage.getItem('loginId'),
    })
    .subscribe(
      (res) => {
        this.todos = res.response.companies;
      }
    );
}

export function getCompanies() {
  ajax
    .post('http://localhost:5000/getcompany', {
      userid: localStorage.getItem('loginId'),
    })
    .subscribe(
      (res) => {
        this.todos = res.response.companies;
      }
    );
}

export function deleteCompany(id) {
  ajax
    .post('http://localhost:5000/delete', {
      id: id,
      userid: localStorage.getItem('loginId'),
    })
    .subscribe(
      (res) => {
        this.todos = res.response.companies;
      }
    );
}
