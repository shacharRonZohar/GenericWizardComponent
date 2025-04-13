# Enhanced Wizard Component

A modern, flexible, and customizable wizard component built with React and TypeScript. This component provides a step-by-step interface for guiding users through complex processes or forms.

## Features

- 🎯 **Type-Safe**: Built with TypeScript for better development experience
- 🎨 **Customizable**: Styled with Tailwind CSS for easy theming and customization
- 🚀 **Modern Stack**: Built with Vite for fast development and optimized builds
- 📱 **Responsive**: Works seamlessly across different screen sizes
- 🧪 **Tested**: Includes comprehensive test coverage with Vitest
- 🐳 **Docker Support**: Ready for containerized deployment
- 📦 **Production Ready**: Optimized build process with Nginx configuration

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier
- **Containerization**: Docker, Nginx

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd enhanced-wizard
```

2. Install dependencies:

```bash
npm install

```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

### Testing

Run the test suite:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

### Docker Deployment

Build the Docker image:

```bash
docker build -t enhanced-wizard .
```

Run the container:

```bash
docker run -p 80:80 enhanced-wizard
```

The application will be available at `http://localhost`

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # React components
├── test/          # Test files
├── types/         # TypeScript type definitions
├── util/          # Utility functions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
