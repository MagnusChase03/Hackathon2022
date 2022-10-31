# Frontend Documentation

## TODO
- Create (copy) navbar
- Research and prep for cookie/local storage implementation
- Create color pallete
- Cleanup initial CSS


## Potential Packages
- formik (Create rich forms easily)
- react-cookie (cookie management in React hook style)
- yup (Form validation)


## Styles
Basic styling information and guidelines is listed below for a consistent visual experience across the application. All pages and components should adhere to these styling guidelines.

### Colors
The following color patterns should be used across the app:
- Primary Color: 0xFFFFFF
- Secondary Color: 0x000000


## Technical Documentation
### FETCH Form Encoding
No need for additional encoding function when using modern browser with URL Search Parameter support. This works for vanilla React, but is not compatible with React Native and similar.
```js
fetch('https://example.com/login', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },    
    body: new URLSearchParams({
        'userName': 'test@gmail.com',
        'password': 'Password!',
        'grant_type': 'password'
    })
});
```