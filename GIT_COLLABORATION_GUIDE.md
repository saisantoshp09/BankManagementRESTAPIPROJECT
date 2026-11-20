# Git Collaboration Guide for Bank Management Project

## 🚀 Quick Start for You & Your Friend

### 1. Initial Setup (First Time)
```powershell
# Clone the repository
git clone <repository-url>
cd BankManagementRESTAPIPROJECT

# Check your name and email are configured
git config --list | findstr user
```

### 2. Configure Git (Do This Once)
```powershell
# Set your name globally
git config --global user.name "Your Name"

# Set your email globally  
git config --global user.email "your.email@example.com"

# Or configure just for this project (remove --global)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## 📋 Daily Workflow

### **Start Your Work**
```powershell
# 1. Get latest changes from remote
git fetch origin

# 2. Pull latest from main/develop branch
git pull origin main

# 3. Create a new feature branch
git checkout -b feature/your-feature-name
```

### **During Development**
```powershell
# Make changes to your files
# Then stage your changes
git add .

# Or add specific files
git add AccountService.java AccountRepository.java

# Commit with clear message
git commit -m "Add feature: describe what you did"

# Push to your branch
git push origin feature/your-feature-name
```

### **Creating a Pull Request**
1. Go to your GitHub/GitLab repository
2. Click "New Pull Request"
3. Select your branch
4. Add description of changes
5. Request review from your friend
6. After approval, merge to main

---

## ⚠️ Handling Merge Conflicts

### **Scenario: You need to merge friend's changes**

#### Step 1: See if there are conflicts
```powershell
# Fetch latest
git fetch origin

# Try merging
git merge origin/friend-branch

# If conflicts, you'll see error:
# CONFLICT (content): Merge conflict in <filename>
```

#### Step 2: Check conflicted files
```powershell
git status
```

Shows files with conflicts (marked as "both modified")

#### Step 3: Open the conflicted file and resolve

You'll see conflict markers:
```
<<<<<<< HEAD
// Your code
public void withdraw(double amount) {
    balance = balance - amount;
}
=======
// Friend's code
public void withdraw(double amount) {
    if (amount > balance) throw new Exception("Insufficient funds");
    balance -= amount;
}
>>>>>>> friend-branch
```

**Choose one or combine:**
```java
// Final version (best of both)
public void withdraw(double amount) {
    if (amount > balance) throw new Exception("Insufficient funds");
    balance -= amount;  // Same as: balance = balance - amount
}
```

#### Step 4: Complete the merge
```powershell
# Mark conflict as resolved
git add AccountService.java

# Finish merge
git commit -m "Resolves merge conflict from friend-branch"

# Push to your branch
git push origin your-branch
```

---

## 🔄 Rebase vs Merge

### **MERGE** (Recommended for collaboration)
```powershell
# Merges friend's branch into yours
git merge origin/friend-branch

# Creates a merge commit (keeps history clear)
```
**✅ Use when:** Working in a team, need clear history

### **REBASE** (Advanced)
```powershell
# Replays your commits on top of friend's branch
git rebase origin/friend-branch

# Conflicts resolved one commit at a time
```
**⚠️ Use when:** Personal branches, clean history needed

If rebase conflicts happen:
```powershell
# Resolve conflicts, then:
git add .
git rebase --continue

# Or abort and go back to merge:
git rebase --abort
git merge origin/friend-branch
```

---

## 📝 Useful Commands

```powershell
# See all branches
git branch -a

# See commit history
git log --oneline

# See what changed since last commit
git diff

# See differences between branches
git diff origin/friend-branch

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Switch branches
git checkout main

# Create and switch to new branch
git checkout -b feature/new-feature

# See who changed what
git blame AccountService.java

# See remote URLs
git remote -v
```

---

## 🎯 Best Practices

### ✅ DO:
- **Pull before you push**: `git pull origin main`
- **Use clear commit messages**: "Add withdrawal feature" not "fix stuff"
- **Make small commits**: Each feature/bug fix in separate commits
- **Use feature branches**: `feature/withdrawal`, `bugfix/login-issue`
- **Communicate with friend**: "I'm working on AccountService, you work on Controller"
- **Review each other's code**: Pull requests before merging
- **Merge frequently**: Don't let branches diverge too long

### ❌ DON'T:
- Push directly to main without testing
- Make huge commits with many unrelated changes
- Edit the same file at the same time without communication
- Force push to shared branches (`git push --force`)
- Commit sensitive data (use `.gitignore`)
- Leave changes uncommitted for days

---

## 🚨 Emergency Commands

```powershell
# Undo all changes since last commit
git checkout .

# Get back to last commit (discard current work)
git reset --hard HEAD

# See what would be deleted
git clean -n

# Delete untracked files
git clean -fd

# Recover deleted commits (find them first)
git reflog
git checkout <old-commit-hash>
```

---

## 📞 Common Problems & Solutions

### Problem: "Your branch is ahead of 'origin/main' by 5 commits"
**Solution:** You have local commits not pushed yet
```powershell
git push origin your-branch
```

### Problem: "Would overwrite working tree files"
**Solution:** You have uncommitted changes that conflict with pull
```powershell
git stash        # Save your changes
git pull         # Get latest
git stash pop    # Restore your changes
```

### Problem: Merge conflict in too many files
**Solution:** Abort and try a cleaner approach
```powershell
git merge --abort
git rebase --abort  # if rebasing

# Start fresh
git fetch origin
git pull origin main
```

### Problem: "fatal: Not a git repository"
**Solution:** You're not in the project directory
```powershell
cd D:\JAVA-GITPRACTICE\BankManagementRESTAPIPROJECT
git status
```

---

## 🔐 Protecting Sensitive Data

Your `.gitignore` already covers:
- `.env` - Environment variables
- `.ebextensions/` - AWS Elastic Beanstalk config
- `application-dev.properties` - Local configs

**Never commit:**
- Database passwords
- API keys
- AWS credentials
- OAuth tokens
- Personal information

---

## 📚 Resources

```powershell
# Get help on any command
git help <command>

# Examples:
git help merge
git help rebase
git help push
```

---

## Questions?

If you and your friend hit any issues:
1. Check this guide
2. Run `git status` to see what's happening
3. Don't panic - Git history can be recovered!
4. Ask for help before force pushing

