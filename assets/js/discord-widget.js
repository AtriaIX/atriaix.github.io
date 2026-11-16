(function(){
  var USER_ID = "1435697323547033741";
  var PROFILE_URL = "https://discord.com/users/" + USER_ID;

  var STATUS_COLORS = { online: '#3ba55d', idle: '#faa61a', dnd: '#ed4245', offline: '#747f8d' };
  var STATUS_LABELS = { online: 'Online', idle: 'Idle', dnd: 'Do Not Disturb', offline: 'Offline' };

  var nameEl = document.getElementById('dwName');
  var tagEl = document.getElementById('dwTag');
  var statusTextEl = document.getElementById('dwStatusText');
  var avatarEl = document.getElementById('dwAvatar');
  var dotEl = document.getElementById('dwStatusDot');
  var widget = document.getElementById('discordWidget');

  if(!widget) return;

  // Whole card links to the Discord profile — set here in JS
  // rather than as a static <a> tag, since markdown files can
  // mangle raw <a> blocks with nested elements inside them.
  widget.style.cursor = 'pointer';
  widget.addEventListener('click', function(){
    window.open(PROFILE_URL, '_blank', 'noopener');
  });

  function getActivityText(d, status){
    var activities = d.activities || [];

    // Custom status (the little text/emoji someone sets manually) takes priority
    var custom = activities.find(function(a){ return a.type === 4; });
    if(custom && custom.state){ return custom.state; }

    if(d.listening_to_spotify && d.spotify){
      return 'Listening to ' + d.spotify.song + ' — ' + d.spotify.artist;
    }

    var playing = activities.find(function(a){ return a.type === 0; });
    if(playing && playing.name){ return 'Playing ' + playing.name; }

    var watching = activities.find(function(a){ return a.type === 3; });
    if(watching && watching.name){ return 'Watching ' + watching.name; }

    return STATUS_LABELS[status] || 'Offline';
  }

  fetch('https://api.lanyard.rest/v1/users/' + USER_ID)
    .then(function(res){ return res.json(); })
    .then(function(json){
      if(!json.success) throw new Error('lanyard fetch failed');
      var d = json.data;
      var user = d.discord_user;
      var status = d.discord_status || 'offline';

      var avatarUrl;
      if(user.avatar){
        var ext = user.avatar.indexOf('a_') === 0 ? 'gif' : 'png';
        avatarUrl = 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.' + ext + '?size=128';
      } else {
        var fallbackIndex = (parseInt(user.discriminator, 10) || 0) % 5;
        avatarUrl = 'https://cdn.discordapp.com/embed/avatars/' + fallbackIndex + '.png';
      }

      if(nameEl) nameEl.textContent = user.global_name || user.username;

      // Discord's "Server Tag" badge (small pill + icon next to the name).
      if(tagEl){
        var guildTag = user.primary_guild;
        if(guildTag && guildTag.tag){
          var badgeHtml = '';
          if(guildTag.badge && guildTag.identity_guild_id){
            var badgeUrl = 'https://cdn.discordapp.com/clan-badges/' + guildTag.identity_guild_id + '/' + guildTag.badge + '.png?size=16';
            badgeHtml = '<img src="' + badgeUrl + '" alt="" class="dw-tag-icon">';
          }
          tagEl.innerHTML = badgeHtml + guildTag.tag;
          tagEl.style.display = 'inline-flex';
        } else {
          tagEl.style.display = 'none';
        }
      }

      if(statusTextEl) statusTextEl.textContent = getActivityText(d, status);
      if(avatarEl) avatarEl.src = avatarUrl;
      if(dotEl) dotEl.style.background = STATUS_COLORS[status] || STATUS_COLORS.offline;
    })
    .catch(function(err){
      widget.style.display = 'none';
      console.error('Discord widget failed to load:', err);
    });
})();
