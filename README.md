# Digital Wallet Project Documentation

## Overview

The Digital Wallet project replicates functionalities similar to eSewa, allowing users to securely manage their finances through a web application. This project includes features such as user registration, fund insertion from dummy banking services, peer-to-peer (P2P) transfers, and transaction history viewing. It utilizes modern technologies including Next.js for the frontend, Node.js for the backend, TypeScript for type safety, Prisma for database management, and NextAuth for authentication.

## Technologies Used

- Frontend: Two Next.js applications (User App & Merchant App)
- Backend: Node.js with TypeScript
- Database Management: Prisma
- Authentication: NextAuth
- Monorepo Management: Turborepo

## Installation Instructions

1. Clone the repository.
2. Navigate to the project directory.
4. Replace the `.env` files located in `/app/user-app` (NEXT AUTH URL && JWT SECRET) and `/packages/db` (for database URL).
5. Execute `npx prisma migrate dev` followed by `npx prisma generate`.
3. Run `npm install` or `yarn install` globally(in root folder).
6. Start the User App by navigating to `/app/user-app` and running `npm run dev`.

## Features

- User Authentication: Login and logout functionality.
- Fund Insertion: Users can insert money through a bank interface. Funds are added after hitting a secure Node.js endpoint.
- P2P Transfers: Users can send money to other users on the platform.
- Transaction History: View all transactions made, including debits and credits.

## Folder Structure

The project follows a monorepo structure with the following key directories:

- `/apps`: Contains both Next.js frontend projects (User App & Merchant App && Nodejs Backend).
- `/packages`: Includes global setups like Recoil for state management, UI components, and Prisma for database management.

## Contribution Guidelines

Contributors should have knowledge of working with monorepos. There are no strict guidelines beyond this requirement.

## Usage Examples

This project showcases secure methods of transferring funds and managing user assets in a financial application. It demonstrates how financial platforms manage their users and transactions while maintaining security.

## Any Other Relevant Information

Thank you for reviewing this documentation! Your interest in exploring and potentially contributing to this project is greatly appreciated. If you have any questions, feedback, or wish to contribute, please don't hesitate to reach out.

Happy coding!