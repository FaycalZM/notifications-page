// importing the notifications from the .json file

import notifications from './notifications.js';


const main_section = document.getElementsByClassName("main_section")[0];
const notifs_number = document.getElementById("number");
// mark all the notifications as read
function mark_all_as_read() {
    notifs_number.innerText = "0";
    notifications.forEach(notification => {
        if (!notification.isRead)
            notification.isRead = true;
    });

    loadNotifications(notifications);
}

document.getElementById("mark_all_as_read").addEventListener("click", mark_all_as_read);



// create and return a "notification" element 
function createNotification(notification) {

    let notif = document.createElement("div");
    notif.className = "notification";

    let in_notif = document.createElement("div");
    in_notif.className = "in_notif";

    let avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = notification.avatar;

    let user = document.createElement("span");
    user.className = "name";
    user.innerText = notification.user;

    let action = document.createElement("span");
    action.className = "action";

    let not = document.createElement("div");
    not.className = "not";

    let content = document.createElement("p");
    content.className = "content";

    let sent = document.createElement("p");
    sent.className = "sent";
    sent.innerText = notification.sent_time;

    let recent_post = document.createElement("span");
    recent_post.className = "recent_post";

    let posted_pic = document.createElement("img");
    posted_pic.className = "posted_pic";

    let message = document.createElement("p");
    message.className = "msg";

    let group = document.createElement("span");
    group.className = "highlighted";

    content.appendChild(user);


    switch (notification.action_type) {
        case "reaction":
            action.innerText = "reacted to your recent post ";
            content.appendChild(action);
            recent_post.innerText = notification.recent_post;
            content.appendChild(recent_post);
            not.appendChild(content);
            not.appendChild(sent);
            in_notif.appendChild(avatar);
            in_notif.appendChild(not);
            notif.appendChild(in_notif);
            break;

        case "follow":
            action.innerText = "followed you";
            content.appendChild(action);
            not.appendChild(content);
            not.appendChild(sent);
            in_notif.appendChild(avatar);
            in_notif.appendChild(not);
            notif.appendChild(in_notif);
            break;

        case "comment":
            action.innerText = "commented on your picture";
            posted_pic.src = notification.picture;
            content.appendChild(user);
            content.appendChild(action);
            not.appendChild(content);
            not.appendChild(sent);
            in_notif.appendChild(avatar);
            in_notif.appendChild(not);
            notif.appendChild(in_notif);
            notif.appendChild(posted_pic);
            break;

        case "message_sent":
            action.innerText = "sent you a private message";
            message.innerText = notification.message;
            content.appendChild(user);
            content.appendChild(action);
            not.appendChild(content);
            not.appendChild(sent);
            not.appendChild(message);
            in_notif.appendChild(avatar);
            in_notif.appendChild(not);
            notif.appendChild(in_notif);
            break;

        case "group_join":
            action.innerText = "has joined your group ";
            group.innerText = notification.group;
            content.appendChild(action);
            content.appendChild(group);
            not.appendChild(content);
            not.appendChild(sent);
            in_notif.appendChild(avatar);
            in_notif.appendChild(not);
            notif.appendChild(in_notif);
            break;

        case "group_left":
            action.innerText = "left the group ";
            group.innerText = notification.group;
            content.appendChild(action);
            content.appendChild(group);
            not.appendChild(content);
            not.appendChild(sent);
            in_notif.appendChild(avatar);
            in_notif.appendChild(not);
            notif.appendChild(in_notif);
            break;

    }

    if (!notification.isRead) {
        notif.classList.add("not_read");
        notif.style.cursor = "pointer";
        let red_dot = document.createElement("span");
        red_dot.className = "red_dot";
        content.appendChild(red_dot);
    }

    return notif;
}

// append the notifications to the main section
function loadNotifications(notifications) {
    let num = 0;
    main_section.innerHTML = "";
    notifications.forEach(notification => {
        if (!notification.isRead)
            num++;
        main_section.appendChild(createNotification(notification));
    });

    notifs_number.innerText = num;
}

// load the notifications when the page renders
loadNotifications(notifications);