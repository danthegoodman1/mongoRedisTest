// NOTE: To send messages to a single person, make then subscribe to a channel that is unique to something, then emit on that channel. Channels are created and destrpyed dynamically by ably when people are subscribed/unsubed from them

var apiKey = 'xVLyHw.Y1JN_g:Eu5PskBQN6CzId3j',
    realtime = new Ably.Realtime({ key: apiKey }),
    channel = realtime.channels.get("rfgrgrgrgrg");

channel.on('attaching', function() {
  show('Attaching channel', 'orange');
});

channel.on('attached', function() {
  show('✓ Channel is attached, receiving messages...', 'green');
});

channel.on('detached', function() {
  show('✗ Channel is detached', 'red');
});

$('input#attach').on('click', function() {
  channel.attach();
});

$('input#detach').on('click', function() {
  channel.detach();
});

function show(status, color) {
  $('#channel-status').text(status).css('color', color);
}

channel.subscribe((mes) => {
  console.log(`${mes.name}: ${mes.data}`)
  console.log(mes)
  console.log(new Date(mes.timestamp).toISOString())
})

setTimeout(() => {
  console.log("sending")
  channel.publish("hey", "ho")
}, 3000)
