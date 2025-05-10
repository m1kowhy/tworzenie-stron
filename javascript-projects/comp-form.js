// Function to validate each form field
function validateForm() {
  const fullName = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const orderNo = document.getElementById('order-no').value.trim();
  const productCode = document.getElementById('product-code').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const complaintsGroup = document.querySelectorAll('#complaints-group input[type="checkbox"]:checked');
  const complaintDescription = document.getElementById('complaint-description').value.trim();
  const solutionsGroup = document.querySelectorAll('#solutions-group input[type="radio"]:checked');
  const solutionDescription = document.getElementById('solution-description').value.trim();

  // Validation checks
  const validations = {
    'full-name': fullName !== '',
    'email': /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
    'order-no': /^2024\d{6}$/.test(orderNo),
    'product-code': /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d{1}$/.test(productCode),
    'quantity': /^[1-9]\d*$/.test(quantity),
    'complaints-group': complaintsGroup.length > 0,
    'complaint-description': complaintDescription.length >= 20 || !document.querySelector('#complaints-group input[value="other"]:checked'),
    'solutions-group': solutionsGroup.length > 0,
    'solution-description': solutionDescription.length >= 20 || !document.querySelector('#solutions-group input[value="other"]:checked')
  };

  return validations;
}

// Function to check if all fields are valid
function isValid(validations) {
  return Object.values(validations).every(value => value);
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const validations = validateForm();

  // Highlighting fields based on validation results
  const fields = [
    { id: 'full-name', fieldType: 'input' },
    { id: 'email', fieldType: 'input' },
    { id: 'order-no', fieldType: 'input' },
    { id: 'product-code', fieldType: 'input' },
    { id: 'quantity', fieldType: 'input' },
    { id: 'complaints-group', fieldType: 'fieldset' },
    { id: 'complaint-description', fieldType: 'textarea' },
    { id: 'solutions-group', fieldType: 'fieldset' },
    { id: 'solution-description', fieldType: 'textarea' }
  ];

  fields.forEach(field => {
    const element = document.getElementById(field.id) || document.querySelector(`#${field.id} fieldset`);
    if (validations[field.id]) {
      element.style.borderColor = 'green';
    } else {
      element.style.borderColor = 'red';
    }
  });

  // Final form submission check
  if (isValid(validations)) {
    alert("Form submitted successfully!");
    // Submit form or handle other logic here
  } else {
    alert("Please fix the errors in the form.");
  }
}

// Add event listener to form
document.getElementById('order-form').addEventListener('submit', handleFormSubmit);

// Add change events to update border colors for form inputs
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('change', () => {
    const validations = validateForm();
    const fieldId = input.id || input.closest('fieldset').id;

    const element = document.getElementById(fieldId) || input.closest('fieldset');
    if (validations[fieldId]) {
      element.style.borderColor = 'green';
    } else {
      element.style.borderColor = 'red';
    }
  });
});

