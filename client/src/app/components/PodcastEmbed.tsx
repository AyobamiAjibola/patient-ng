
const PodcastEmbed = ({ link, height = '176px' }: any) => {

  return (
    <iframe 
        id="embedPlayer"
        src={link}
        // height={height}
        frameBorder="0" 
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-presentation" 
        allow="autoplay *; encrypted-media *; clipboard-write; accelerometer; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          width: '100%',
          height: height,
          overflow: 'hidden',
          borderRadius: '10px',
          transform: 'translateZ(0px)',
          animation: '2s ease 0s 6 normal none running loading-indicator'
        }}
    >
    </iframe>
    // YOUTUBE:: https://youtu.be/feMd_GvZSf4?si=k2AZe_OEUkQ7hlSD -- take this link and the save only after be
    // SPOTIFY:: https://open.spotify.com/episode/0ZCkwJmzHJks3SOCBgPAII?si=iYgekt20TUujIYCxfr4fwg -- take this and then save only after episode/ and stop at ?
    // APPLE:: https://podcasts.apple.com/us/podcast/108-dr-jordan-b-peterson-we-who-wrestle-with-god/id1492492083?i=1000654660669 -- take this and save everyhting after us/podcast/
  );
};

export default PodcastEmbed;
