const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values) {
  const errors = {}
  const name = values.name?.trim() ?? ''
  const email = values.email?.trim() ?? ''
  const budget = values.budget?.trim() ?? ''
  const message = values.message?.trim() ?? ''

  if (!name) errors.name = 'Name is required.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.'

  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.'

  if (!budget) errors.budget = 'Please select a budget range.'

  if (!message) errors.message = 'Message is required.'
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.'
  else if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.'

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: { name, email, budget, message },
  }
}

export function validateLoginForm(values) {
  const errors = {}
  const email = values.email?.trim() ?? ''
  const password = values.password ?? ''

  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.'

  if (!password?.trim()) errors.password = 'Password is required.'

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: { email, password },
  }
}
