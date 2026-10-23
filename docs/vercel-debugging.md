# Vercel deployment debugging

Run these commands in PowerShell from this project folder:

```powershell
cd E:\Projects\urmei-influencer-portal
vercel login
vercel link
vercel list influencer-portal
```

Copy the failed deployment URL or ID from the list, then run:

```powershell
vercel inspect <deployment-url-or-id> --logs
```

For runtime errors:

```powershell
vercel logs --deployment <deployment-url-or-id> --level error --expand
```

Paste the output into the chat after removing secrets and environment-variable values.

Never put a Vercel token, password, or API key in this file or commit it to the repository.
