# Git Branching Strategy for Bank Management Project

## 📊 Branch Structure

```
main (production)
  ├── release/
  └── hotfix/

develop (development)
  ├── feature/account-management
  ├── feature/transaction-history
  ├── feature/authentication
  └── bugfix/login-issue
```

---

## 🔀 Branch Types

### 1. **main** - Production Ready
- Only tested, production-ready code
- Tagged with version numbers (v1.0.0)
- No direct commits (only merges from release/hotfix)

```powershell
# Usage: Only merge when ready for production
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin main --tags
```

---

### 2. **develop** - Integration Branch
- Contains latest development features
- Integration point for feature branches
- Should be stable and tested

```powershell
# Usage: Merge completed features here
git checkout develop
git merge --no-ff feature/your-feature
git push origin develop
```

---

### 3. **feature/** - New Features
- Branch from: `develop`
- Naming: `feature/feature-name`
- Examples:
  - `feature/account-withdrawal`
  - `feature/interest-calculation`
  - `feature/user-authentication`

```powershell
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/account-withdrawal

# Work on feature
git add .
git commit -m "Add account withdrawal functionality"

# Push to remote
git push origin feature/account-withdrawal

# When done: Create Pull Request to merge into develop
```

---

### 4. **bugfix/** - Bug Fixes
- Branch from: `develop`
- Naming: `bugfix/bug-description`
- Examples:
  - `bugfix/login-null-pointer`
  - `bugfix/withdrawal-amount-validation`
  - `bugfix/database-connection-timeout`

```powershell
# Create bugfix branch
git checkout develop
git pull origin develop
git checkout -b bugfix/login-null-pointer

# Fix the bug
git add .
git commit -m "Fix null pointer exception in login"

# Push and create Pull Request to develop
git push origin bugfix/login-null-pointer
```

---

### 5. **release/** - Release Preparation
- Branch from: `develop`
- Naming: `release/v1.0.0`
- For final testing and minor bug fixes before production

```powershell
# Create release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# Make final changes/version bump
# Version: pom.xml <version>1.0.0</version>
git add pom.xml
git commit -m "Bump version to 1.0.0"

# Push release branch
git push origin release/v1.0.0

# When ready for production:
# 1. Create Pull Request to merge into main
# 2. Tag the merge commit with version
# 3. Merge back into develop
```

---

### 6. **hotfix/** - Emergency Fixes
- Branch from: `main`
- Naming: `hotfix/issue-description`
- For critical production bugs

```powershell
# Create hotfix branch (from main)
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-issue

# Fix the issue
git add .
git commit -m "Fix critical security vulnerability"

# Push and create Pull Request to main
git push origin hotfix/critical-security-issue

# When approved:
# 1. Merge into main
# 2. Tag with patch version (v1.0.1)
# 3. Also merge back into develop
```

---

## 🎯 Complete Workflow Example

### Scenario: You and your friend work on withdrawal feature

#### Friend Works on Feature
```powershell
# Friend creates branch
git checkout develop
git pull origin develop
git checkout -b feature/withdrawal

# Friend makes changes
echo "public void withdraw() {...}" >> AccountService.java
git add .
git commit -m "Implement withdrawal logic"
git push origin feature/withdrawal

# Friend creates Pull Request on GitHub/GitLab
# -> Requests review from you
```

#### You Review & Request Changes
```powershell
# You fetch and see friend's branch
git fetch origin
git checkout feature/withdrawal

# Review the code
cat AccountService.java

# You find an issue and comment in the PR
# Friend fixes it:
git add .
git commit -m "Fix validation in withdrawal"
git push origin feature/withdrawal
```

#### You Approve
```powershell
# You approve the PR on GitHub/GitLab
# Friend merges into develop
```

#### Integration
```powershell
# You pull the updated develop
git checkout develop
git pull origin develop

# Now you work on your feature
git checkout -b feature/interest-calculation
# ... make changes ...
git push origin feature/interest-calculation
```

---

## 📋 Pull Request Checklist

Before creating/merging a Pull Request:

- [ ] Branch created from correct base branch (develop/main/hotfix)
- [ ] Latest changes from base branch are pulled
- [ ] Code compiles without errors: `mvn clean install`
- [ ] Tests pass: `mvn test`
- [ ] Code follows project standards
- [ ] No merge conflicts
- [ ] Commit messages are clear
- [ ] Sensitive data not committed (check `.gitignore`)
- [ ] No unused imports or debug code
- [ ] Related issues/tickets referenced

---

## 🔄 Merge Strategies

### **Squash Merge** (Recommended for features)
Combines all commits into one:
```powershell
git merge --squash feature/withdrawal
git commit -m "Add withdrawal feature (closes #123)"
git push origin develop
```
✅ Clean history, easy to revert feature

---

### **No-Fast-Forward Merge** (Keep branch context)
Creates merge commit even if no conflicts:
```powershell
git merge --no-ff feature/withdrawal
git push origin develop
```
✅ Shows branch topology, knows when feature was added

---

### **Fast-Forward Merge** (Linear history)
```powershell
git merge feature/withdrawal  # Fast-forward by default
git push origin develop
```
✅ Simplest, but loses branch information

---

## 📊 Branch Naming Convention

```
<type>/<description>

Types:
  - feature/      New features
  - bugfix/       Bug fixes
  - hotfix/       Production fixes
  - release/      Release preparation
  - refactor/     Code refactoring
  - docs/         Documentation only
  - chore/        Build, dependencies, tooling

Description Guidelines:
  - Use lowercase
  - Use hyphens to separate words
  - Be descriptive but concise
  - Reference issue number if applicable

Examples:
  ✅ feature/user-authentication
  ✅ bugfix/null-pointer-exception-line-42
  ✅ docs/readme-update
  ✅ hotfix/security-vulnerability-001
  ❌ feature_new-stuff
  ❌ fix something
  ❌ BUGFIX-LOGIN
```

---

## 🎓 Learning Resources

```powershell
# Understand branch strategy
git help branch

# Understand merging
git help merge

# Practice commands (safe)
git log --graph --oneline --all  # View branch tree
git show-branch                   # Compare branches
```

---

## ⚡ Quick Commands

```powershell
# List all branches (local + remote)
git branch -a

# See branch tracking
git branch -vv

# Delete a branch locally
git branch -d feature/old-feature

# Delete a branch on remote
git push origin --delete feature/old-feature

# Rename current branch
git branch -m feature/old-name feature/new-name

# Set which branch to track
git branch -u origin/feature/withdrawal

# See commits in your branch vs develop
git log develop..HEAD
```

---

## 🚀 Production Deployment Pipeline

```
1. Develop in feature branch
       ↓
2. Create Pull Request to develop
       ↓
3. Code Review & Approval
       ↓
4. Merge into develop (merge/squash)
       ↓
5. Testing in develop environment
       ↓
6. Create release branch from develop
       ↓
7. Final testing & version bump
       ↓
8. Merge release into main & tag
       ↓
9. Merge release back into develop
       ↓
10. Deploy to production from main
```

---

## 📝 Commit Message Best Practices

### Format
```
<type>(<scope>): <subject>

<body>

<footer>

Examples:
feat(account): add withdrawal functionality
   - Implement withdraw method in AccountService
   - Add balance validation
   - Add transaction logging
   Closes #42

fix(auth): resolve null pointer in login
   Fixed NPE when user.email is null

docs(readme): update installation steps

chore(dependencies): update Maven dependencies
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style, formatting
- `refactor`: Code refactoring
- `test`: Adding or fixing tests
- `chore`: Build, dependencies, tooling

---

## 🎯 Tips for Collaboration

1. **Communicate** - Tell your friend what branch you're working on
2. **Pull often** - Stay in sync with latest changes: `git pull origin develop`
3. **Push frequently** - Share your work: `git push origin feature/your-feature`
4. **Short-lived branches** - Merge within a few days, don't let branches diverge
5. **Review carefully** - Take time to understand friend's changes
6. **Test before merging** - Run `mvn clean test` before approving
7. **Use Pull Requests** - Not just `git push`, but PR for review
8. **Leave comments** - Explain why, not just what your code does

---

## 🆘 Emergency Rollback

If a bad merge gets to main:

```powershell
# See recent commits
git log --oneline -n 20

# Revert the bad merge
git revert -m 1 <merge-commit-hash>

# This creates a new commit that undoes the merge
git push origin main
```

All set! Happy collaborating! 🚀

