# 🧠 Memory Vault

A personalized memory archive for Alzheimer’s patients – designed to help them reconnect with their past, loved ones, and identity.
[Demo_Video_Link](https://drive.google.com/file/d/1A73D5rCaTfI9gMbAmb-fMxrwCTrMHEe7/view?usp=sharing)

## 📌 Overview

Alzheimer’s disease slowly erases the most cherished parts of life — our memories. Memory Vault is a web-based solution that provides Alzheimer’s patients and their caregivers a safe, emotionally resonant space to store, organize, and revisit meaningful memories through images, context, and people tagging.

This project was developed as part of an academic initiative by Team Codingers from MKSSS’s Cummins College of Engineering for Women.


## 💡 Problem Statement

Alzheimer’s patients often:
- Forget names, faces, and events.
- Experience emotional disconnect from loved ones.
- Struggle with scattered or unorganized photo storage.
- Fail to recall the context behind old photos.
- Get frustrated or scared by unfamiliar or misunderstood images.

There is a lack of **emotionally intelligent digital tools** that support memory recollection in a **personalized and comforting** way.


## ✅ Our Solution

Memory Vault addresses these challenges through:

- 🖼 **Seamless Image Uploading**: Add photos with title, date, and story.
- 🏷 **Contextual & People Tagging**: Add people and emotional context to each memory.
- 💖 **Favorites Section**: Mark cherished memories for quick access.
- 👥 **Dedicated People Page**: Helps users remember and recognize loved ones.
- 🔎 **Smart Filtering**: Find memories by tags or people.
- 📆 **Memory Calendar**: View memories organized by date.
- 📊 **Dashboard**: Shows memory stats and recent uploads.
  
These features are designed to help patients recall memories more easily and offer caregivers a structured way to support them.

## 🧱 Application Architecture

- **Frontend**: Built with React.js
- **Backend**: Node.js / Express.js
- **Database**: Postgresql
- **Version Control**: Git & GitHub
- **Cloud Integration**: For storing photos - Cloudinary


## 🔁 Application Workflow - [Demo_Video_Link](https://drive.google.com/file/d/1A73D5rCaTfI9gMbAmb-fMxrwCTrMHEe7/view?usp=sharing)

1. **Landing Page**
   - Welcome message
   - Sign Up / Log In

2. **Home Page (After Login)**
   - Memory Wall (all uploaded memories)
   - Filter by Tags / People
   - Toggle Favorites

3. **Dashboard**
   - Total Memory Count
   - Recent Memories & Quick Actions
   - Memory Calendar View

4. **Add Memory**
   - Upload Image
   - Add Title, Date, Description
   - Add Tags & People
   - Mark as Favorite

5. **Favorites Page**
   - List of most-loved memories

6. **Family/People Page**
   - List of people added
   - View who appears in memories
   - Highlight favorite people

# ⚙️ Installation
## Prerequisites
Node.js & npm
pgAdmin (PostgreSQL GUI)
Cloudinary account

## Setup Steps
Clone the repo

![image](https://github.com/user-attachments/assets/b75df5e7-c5fb-44ab-bf85-a8df59b2e459)

## Create database using pgAdmin
Create a database named memory_archive
Open terminal or pgAdmin query tool, and run:

### psql -U your_username -d memory_vault_db -f server/db.sql

This will create required tables.

## Cloudinary setup
Create a .env file inside /server:

![image](https://github.com/user-attachments/assets/f096ed46-9f14-498d-a9b3-334726831e4a)

## Install & Run(In Command Prompt )

### Backend (in cmd):
![image](https://github.com/user-attachments/assets/db4a81f6-fb1a-427a-aa3d-3ee8c245ccb0)

### Frontend (in cmd):
![image](https://github.com/user-attachments/assets/33da3e35-331a-473e-8252-755bf3b9a825)

## After Setup :
1. Sign up to Create an Account
2. use this demo video for better understanding [Demo_Video_Link](https://drive.google.com/file/d/1A73D5rCaTfI9gMbAmb-fMxrwCTrMHEe7/view?usp=sharing)

