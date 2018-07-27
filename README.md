# Personal Website

This project is my personal website where I have entries about my projects, research, work experience and awards. It uses Bootstrap, Express, and Passport as the main frameworks. It supports Authentication, Authorization, and it is a full CRUD RESTful web app. Nodejs is used on the backend. It has been deployed.

This project is very useful for most people who want to have a website and want to be able to manage it without having to look at the HTML. It gives you the flexibility to work on your website like a social media platform. 

## Authentication and Authorization
Since I am the only user required to make changes to the site, there is no need for a signup button. I, therefore, only included a login in a button that authenticates me as the owner of the website.  After  I login in, I can make changes to the entries on the website. These include:

* Changing my profile picture
* Adding projects and research items
* Editing added entries
* Deleting added entries

For authentication, I used the passport package and for the method of authentication, I used the local strategy.

## Pictures
The profile picture and project pictures are stored in the database using multer-gridfs-storage. This allows us to store files in our mongo database without a size restriction. 

## APIs
I used the dblp API to seed the initial entries for my research papers in the database. This API does not provide the abstract of the paper or the ranking of the conference. These are added later. The following is the API link to my research papers: http://dblp.org/search/publ/api?q=john+wondoh&format=json

I also create an API to stream my photos so that they can be displayed on the website. This API is used for displaying the profile picture and the pictures for each project.

