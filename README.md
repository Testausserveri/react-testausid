![Group 8](https://user-images.githubusercontent.com/46541386/175104828-f67b3e36-e899-4303-936b-af6e1a22a82a.png)



# react-testausid [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

React component user interface for [testausid](https://github.com/Testausserveri/testausserveri-id). Currently under development.

> **Warning**
> 
> This project is under active development and the implementation is subject to change at any time. Please consult the maintaners regarding to implementing react-testausid in your project.
## Usage

Add react-testausid to your project:
```bash
$ npm install @testausserveri/react-testausid
```

Example LoginDialog implementation (subject to change!):
```jsx
import { LoginDialog } from "@testausserveri/react-testausid"

function Example() {
    // App info and requested scopes
    const target = {
        scopes: ['token', 'id', 'account', 'contact', 'security'],
        client: '123456...' // Your client ID (required)
    }

    // Login options allowed for display
    // Note: IF YOU WANT TO LIMIT/FORCE CERTAIN METHODS: Always validate the user used the platform you specified after the login!
    const accept = [
        'discord',
        'google',
        'twitter',
        'github',
        'testausserveri',
        'wilmaplus'
    ]

    return (
        <div>
            <LoginDialog target={target} accept={accept} onBlocked={(error) => { alert(error) }} onLogin={(user) => {
                alert('New login! ' + JSON.stringify(user))
            }}/>
        </div>
    )
}
```

If you're using Next.js, you may need to disable SSR for this component to work. [See an example implementation here](https://github.com/Testausserveri/testausserveri.fi/blob/de8c9dfd3d3b06a1074d30f7660bdc8b956274ba/components/Login/Login.js#L6-L9).

## Development

1. Check your Node.js version (.nvmrc), if you're using nvm, you can apply the right version using command:
```
$ nvm use
```
2. Install dependencies
```
$ npm install
```

Finally, you can preview your changes to the React components using Storybook:
```
$ npm run storybook
```

### Previewing in Coal

To preview in [testausserveri/testausserveri.fi/coal](https://github.com/Testausserveri/testausserveri.fi/tree/coal), first set up your development environment by checking node version and installing dependencies there.

To use your local development copy of react-testausid, first run the following command in react-testausid:
```
$ npm link
```

Next, run the following in Coal (check the relative path):
```
$ npm link ../react-testausid
```
