export const formHelper = () => {
  const validateEmail = (value: string) => {
    // http://emailregex.com/
    return value
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const validateUsername = (value: string) => {
    if(value.length >= 6 && value.length <= 24) return true;
    return false;
  }

  const validatePassword = (value: string) => {
    return value.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
  }

  const validateNotEmpty = (value: string ) => {
    if(value.length >= 1) return true;
    return false;
  }
  const DEFAULT_ERROR: any = {
    email: 'Gelieve een geldig e-mailadres op te geven.',
    username: 'Gelieve een geldige naam op te geven (6 - 24 karakters).',
    password: 'Een geldig wachtwoord is minstens 8 karakters lang en bevat minstens één letter, cijfer en symbool.',
    empty: 'Dit veld mag niet leeg blijven.'
  };

  return {
    validateEmail,
    validateUsername,
    validatePassword,
    validateNotEmpty,
    DEFAULT_ERROR
  }
}
