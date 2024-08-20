# NextWords

## Index

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Live Demo](#live-demo)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
6. [Usage](#usage)
   - [Uploading a CSV File](#uploading-a-csv-file)
   - [Pasting a Word List](#pasting-a-word-list)
   - [Resetting to Default Word List](#resetting-to-default-word-list)
   - [Upcoming Features](#upcoming-features)
7. [Components](#components)
8. [File Structure](#file-structure)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

## Overview

The NextWords is a flashcard-based application designed to help users learn and practice vocabulary. It fetches random words and their definitions from an API, allowing users to view pronunciations, meanings, synonyms, and antonyms. The app also supports custom word lists, enabling users to upload or paste their own vocabulary sets.

##Features

- **Flashcard Display**: Show a random word with its pronunciation, definition, synonyms, and antonyms.
- **Audio Pronunciation**: Play audio pronunciations for words if available.
- **Custom Word Lists**: Upload CSV files or paste word lists directly into the app.
- **Default Word List**: Use a default set of words when no custom list is provided.
- **Word List Management**: Add, replace, or reset custom word lists.
- **Responsive Design**: Suitable for various screen sizes, including mobile devices.

## Technologies Used

- **Next.js**: Framework for React-based server-side rendering (SSR) and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests.
- **PapaParse**: Library for parsing CSV files.

## Live Demo

https://next-words-roy.vercel.app/

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed on your machine.
- Basic knowledge of React and Next.js.

###Installation

1. **Clone the Repository**

```bash
Copy code
git clone https://github.com/utsargo/next-words.git
cd next-words
```

2. **Install Dependencies**

```bash
Copy code
npm install
# or
yarn install
```

3. **Set Up Environment Variables**

Create a .env.local file in the root directory and add the following environment variable:

```
NEXT_PUBLIC_DICTIONARY_API_URL=https://api.dictionaryapi.dev/api/v2/entries/en/
```

4. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:3000` in your browser to view the app.

## Usage

### Uploading a CSV File

1. Click the settings button (⚙️) in the bottom right corner of the app.
2. In the modal that appears, select a CSV file with one word per row.
3. The custom word list will be saved and used instead of the default list.

### Pasting a Word List

1. Click the settings button (⚙️) in the bottom right corner of the app.
2. In the modal, paste your word list into the textarea. Words can be separated by commas or new lines.
3. Click "Save Pasted Word List" to use the custom word list.

### Resetting to Default Word List

1. Click the settings button (⚙️) in the bottom right corner of the app.
2. In the modal, click "Reset to Default Wordlist" to remove the custom list and revert to the default.

### Upcoming Features

1. Search a word and append it to the wordlist in the locastorage

## Components

# Flashcard Component

`Flashcard`: Main component that handles fetching and displaying word data, animations for card flip and button rotation, and managing custom word lists.

## File Structure

- `/public/wordlists/ielts.json`: Default word list in JSON format.
- `/components/Flashcard.tsx`: Flashcard component with main logic.
- `/app/page.tsx`: Main entry point of the application.
- `/app/globals.css`: Global styles and Tailwind CSS configuration.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements. Please follow the standard GitHub contribution workflow:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to royutsargo@gmail.com.
