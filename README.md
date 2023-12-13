# CryptoHub - A Cryptocurrency Portfolio Tracker Web App 📈

![Accred Logo](https://i.imgur.com/W7DZ2u7.png)
![Commit Shield](https://img.shields.io/github/last-commit/blurridge/CryptoHub?style=for-the-badge)
![License](https://img.shields.io/github/license/blurridge/CryptoHub?style=for-the-badge)
## Context

CryptoHub is a project developed as the final assignment for the CPE 3108 - Numerical Methods course. This project dives into the realm of numerical methods, a field that encompasses various algorithms and techniques used to solve problems through numerical approximation. In this context, the focus was on leveraging numerical methods for predicting cryptocurrency values.

Numerical methods form the backbone of scientific computing, offering solutions to problems that might not have straightforward analytical solutions. These methods involve approximating solutions using mathematical models, algorithms, and computational tools, making them crucial in fields ranging from engineering to finance.

One of the key techniques utilized in this project is Lagrange Extrapolation. It's a polynomial interpolation method used to estimate unknown values between known data points. In CryptoHub, Lagrange Extrapolation plays a pivotal role in predicting future cryptocurrency values by extrapolating trends from historical data.

CryptoHub is built using Next.js, a React framework for building web applications, and Firebase, a platform for developing web apps with backend services. The application serves as a crypto portfolio tracker, enabling users to manage and track their cryptocurrency investments.

The heart of CryptoHub lies in its ability to predict future cryptocurrency values using Lagrange Extrapolation. The implementation covers extrapolation functions ranging from linear to sextic degrees, allowing users to explore and predict potential trends in their chosen cryptocurrencies.

## Formula
The formula for Lagrange Extrapolation is:

$f(x) \approx \sum^{n}_{i=0} f(x_i) \cdot \ell_i(x)$

Where:
- $f(x)$ is the estimated function.
- $\sum$ represents summation from $i = 0$ to $n$.
- $f(x_i)$ denotes the known function values at $x_i$.
- $\ell_i(x)$ is the Lagrange basis polynomial.

## Tech Stack

**Client:**

<p> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="next.js" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>

**Server:**

<p><a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a> </p>

## Run Locally

Clone the project

```bash
  git clone https://github.com/blurridge/CryptoHub
```

Go to the project's directory

```bash
  cd CryptoHub/
```

Install dependencies

```bash
  npm install
```

Create a `.env` file containing your Firebase variables. Use `.env.example` as a template.
```
NEXT_PUBLIC_FIREBASE_API_KEY              = <<your firebase api key here>>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN          = <<your firebase auth domain here>>
NEXT_PUBLIC_FIREBASE_PROJECT_ID           = <<your firebase project id here>>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET       = <<your firebase storage bucket here>>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID  = <<your firebase messaging sender id here>>
NEXT_PUBLIC_FIREBASE_APP_ID               = <<your firebase app id here>>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID       = <<your firebase measurement id here>>
NEXT_PUBLIC_COINGECKO_API_KEY             = <<your coingecko api key here>>
NEXT_PUBLIC_GNEWS_API_KEY                 = <<your gnews api key here>>
```

Start the server

```bash
  npm run dev
```

## Stay in touch

If you have any questions, suggestions, need further assistance, feel free to reach out to me. I'm always happy to help!

- Email: [zachriane01@gmail.com](mailto:zachriane01@gmail.com)
- GitHub: [@blurridge](https://github.com/blurridge)
- Twitter: [@zachahalol](https://twitter.com/zachahalol)
- Instagram: [@zachahalol](https://www.instagram.com/zachahalol)
- LinkedIn: [Zach Riane Machacon](https://www.linkedin.com/in/zachriane)

## Contributors
<a href="https://github.com/blurridge/CryptoHub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=blurridge/CryptoHub" />
</a>