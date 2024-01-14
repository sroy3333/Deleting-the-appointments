document.addEventListener("DOMContentLoaded", function () {
    axios.get("https://crudcrud.com/api/22298488c5444d53aadd194b1c3c70bc/appointmentData")
      .then(response => {
        console.log(response);

  
        const existingUsers = response.data;
        existingUsers.forEach(user => {
          showUserOnScreen(user);
        });
      })
      .catch(error => console.error('Error fetching existing users:', error));
  });
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    const user = {
      username,
      email,
      phone
    };
  
    showUserOnScreen(user);
  
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  }
  
  function showUserOnScreen(user) {
    const userList = document.getElementById('userList');
    const li = document.createElement('li');
  
    for (const property in user) {
      if (user.hasOwnProperty(property)) {
        const propertyValue = user[property];
        if (propertyValue !== undefined) {
          const textNode = document.createTextNode(`${property}: ${propertyValue} `); // Add space at the end
          li.appendChild(textNode);
        }
      }
    }
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {

      deleteUser(user._id, li);
    };
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {

    };
  
    li.appendChild(deleteButton);
    li.appendChild(editButton);
  
    userList.appendChild(li);
  }
  
  function deleteUser(userId, listItem) {
    // Make a DELETE request to remove the user from the API
    axios.delete(`https://crudcrud.com/api/22298488c5444d53aadd194b1c3c70bc/appointmentData/${userId}`)
      .then(response => {
        console.log('User deleted successfully:', response);
  
        // Remove the user details from the website
        listItem.remove();
      })
      .catch(error => console.error('Error deleting user:', error));
  }
  