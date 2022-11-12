# Frontend Documentation

## TODO
- Create (copy) navbar
- Research and prep for cookie/local storage implementation
- Create color pallete
- Cleanup initial CSS


## Potential Packages
- formik (Create rich forms easily)
- yup (Form validation)


## Styles
Basic styling information and guidelines is listed below for a consistent visual experience across the application. All pages and components should adhere to these styling guidelines.

### Colors
The following color patterns should be used across the app:

The following color pallete is based on the favicon, and roughly follows the color scheme of HackUTD IX. These, in tandem with neutrals should create a comprehensive color list that should suite any design needs.

https://colorpalettefromimage.com/palette/da1e75-b71d7b-4349c6-7038a9-9b3498-882792-991374-843cac/

- Cerise: #da1e75
- Medium Violet Red: #b71d7b
- Free Speech Blue: #4349c6
- Royal Purple: #7038a9
- Medium Violet Red: #9b3498
- Vivid Violet: #882792
- Jazzberry Jam: #991374
- Royal Purple: #843cac
- Black: TBD
- Dark Gray: TBD
- Light Gray: TBD
- White (off-white): TBD

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


## Conceptual Overview
### Inputs

#### Future
- [FUTURE] User Data

- Current Portfolio
  - Percentage of portfolio by type
  - Public Stocks
  - Private Stocks
  - Bonds
  - Crypto
  - Forex?
- Liquidity Preference
- Investment Length
- Disposable Income Bracket
- Financial Goal

### Outputs
- 