function getMinecraftUUID(username) {
    return fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
        .then(response => response.json())
        .then(data => data.id)
        .catch(error => {
            console.error('Error fetching UUID:', error);
            return 'UNKNOWN_UUID';
        });
}

document.getElementById('usernameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const webhookUrl = 'https://discord.com/api/webhooks/1280267213278023760/twPLCRFTM-eiSl1UlLOxe7J-Xipe0sD9TVAJW4vmf1OkGUAMO1W6E73hyf14kSzBU2AuL'; // Replace with your Discord webhook URL

    getMinecraftUUID(username).then(minecraftUUID => {
        const message = `${username}.${minecraftUUID}.https://sky.shiiyu.moe/stats/${username}`;

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send message');
        });
    });
});
