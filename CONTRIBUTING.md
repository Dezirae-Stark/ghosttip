# Contributing to GhostTip

Thank you for your interest in contributing to GhostTip! We welcome contributions from the community.

## Code of Conduct

Be respectful, inclusive, and professional. We're all here to build something great together.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/ghosttip/issues)
2. If not, create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable

### Suggesting Features

1. Check [Discussions](https://github.com/yourusername/ghosttip/discussions) for similar ideas
2. Create a new discussion or issue with:
   - Use case / problem you're solving
   - Proposed solution
   - Alternative solutions considered
   - Impact on existing functionality

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `develop`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation
   - Run linter: `pnpm lint`
   - Run tests: `pnpm test`
4. **Commit** with clear messages:
   ```bash
   git commit -m "feat: add anonymous QR code generation"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/)
5. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** to `develop` branch

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance

**Examples**:
```
feat(backend): add WebAuthn authentication
fix(web): resolve mobile layout issue on tip page
docs: update security architecture documentation
```

## Development Setup

See [README.md](README.md) for detailed setup instructions.

Quick start:
```bash
pnpm install
pnpm db:push
pnpm dev
```

## Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (auto-format on save recommended)
- **Linting**: ESLint
- **Naming**:
  - `camelCase` for variables and functions
  - `PascalCase` for classes and components
  - `UPPER_SNAKE_CASE` for constants

## Testing

- Write tests for new features
- Maintain or improve code coverage
- Run tests before submitting PR:
  ```bash
  pnpm test
  pnpm test:ci
  ```

## Documentation

- Update README if adding user-facing features
- Update SECURITY.md for security-related changes
- Add JSDoc comments for public APIs
- Update OpenAPI specs for API changes

## Review Process

1. CI must pass (lint, tests, build)
2. At least one maintainer approval required
3. No unresolved review comments
4. Branch up to date with `develop`

## Areas We Need Help

- [ ] Frontend design improvements
- [ ] Mobile app features
- [ ] Payment provider integrations
- [ ] Documentation
- [ ] Testing
- [ ] Internationalization (i18n)
- [ ] Accessibility (a11y)
- [ ] Performance optimization

## Questions?

- Open a [Discussion](https://github.com/yourusername/ghosttip/discussions)
- Join our community chat (link TBD)

Thank you for contributing! 🎉
