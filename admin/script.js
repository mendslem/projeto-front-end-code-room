document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const userList = document.getElementById('user-list');
    const searchInput = document.getElementById('search');
    const clearFormButton = document.getElementById('clear-form');
    const deleteAllButton = document.getElementById('delete-all');
  
    userForm.addEventListener('submit', addUser);
    clearFormButton.addEventListener('click', clearForm);
    deleteAllButton.addEventListener('click', deleteAllUsers);
    searchInput.addEventListener('input', searchUsers);
  
    function addUser(event) {
      event.preventDefault();
  
      const user = {
        id: Date.now(),
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        date: new Date().toLocaleString()
      };
  
      const users = getUsersFromLocalStorage();
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
  
      displayUsers();
      clearForm();
    }
  
    function clearForm() {
      firstNameInput.value = '';
      lastNameInput.value = '';
      emailInput.value = '';
    }
  
    function deleteUser(userId) {
      let users = getUsersFromLocalStorage();
      users = users.filter(user => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(users));
      displayUsers();
    }
  
    function deleteAllUsers() {
      localStorage.removeItem('users');
      displayUsers();
    }
  
    function searchUsers() {
      const query = searchInput.value.toLowerCase();
      const users = getUsersFromLocalStorage();
      const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
      displayUsers(filteredUsers);
    }
  
    function getUsersFromLocalStorage() {
      return JSON.parse(localStorage.getItem('users')) || [];
    }
  
    function displayUsers(users = getUsersFromLocalStorage()) {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${user.date} - ${user.firstName} ${user.lastName} - ${user.email}
          <span class="delete-user" onclick="deleteUser(${user.id})">×</span>
        `;
        userList.appendChild(li);
      });
    }
  
    window.deleteUser = deleteUser;
    displayUsers();
  });