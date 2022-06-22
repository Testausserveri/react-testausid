![Group 8](https://user-images.githubusercontent.com/46541386/175104828-f67b3e36-e899-4303-936b-af6e1a22a82a.png)



# react-testausid [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

React component user interface for [testausid](https://github.com/Testausserveri/testausserveri-id). Currently under development.

## Usage

Add react-testausid to your project:
```bash
$ npm install react-testausid
```

Example LoginDialog implementation (subject to change!):
```jsx
import { LoginDialog } from "@testausserveri/react-testausid"

function Example() {
    // App info and requested scopes
    const target = {
        name: 'Torimies',
        image:
            'https://cdn.discordapp.com/avatars/746084561062068345/fa4ccd88f599bc6b890c8db7528f64b6.webp?width=702&height=702',
        scopes: ['token', 'id', 'account', 'contact', 'security']
    }

    // Login options allowed for display
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
            <LoginDialog target={target} accept={accept} />
        </div>
    )
}
```

If you're using Next.js, you may need to disable SSR for this component to work. [See an example implementation here](https://github.com/Testausserveri/testausserveri.fi/blob/de8c9dfd3d3b06a1074d30f7660bdc8b956274ba/components/Login/Login.js#L6-L9).

## Development

Clone this repository and [testausserveri/testausserveri.fi](https://github.com/testausserveri/testausserveri.fi) to your local machine. Make sure to run `npm install --save-dev` on both repositories before continuing.

Link React dependencies into `react-testausid` from `testausserveri.fi`, so they use the same copy of React.
```bash
$ npm link ../testausserveri.fi/node_modules/react ../testausserveri.fi/node_modules/react-dom
```

Run Storybook to start previewing your changes.
```bash
$ npm run storybook
```

