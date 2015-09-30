var React = require('react');
var request = require('reqwest');

var data = {};

module.exports = React.createClass({
  displayName: 'record',

  getInitialState: function () {
    return {
      recorded  : false
    };
  },


  _handlePlayClick: function () {
    var video = React.findDOMNode(this.refs.video_preview);
    var audio = React.findDOMNode(this.refs.audio_preview);

    video.src = URL.createObjectURL(data.videoBlob);
    audio.src = URL.createObjectURL(data.audioBlob);

    audio.play();
    video.play();

  },

  _handleStopClick: function () {
    var that = this;
    var video = React.findDOMNode(this.refs.video_stream);
    webmRecorder.stopRecording(function() {
              wavRecorder.stopRecording(function() {
                  data = {
                    videoBlob : webmRecorder.blob,
                    audioBlob : wavRecorder.blob
                  };
                  video.pause();
                  that.setState({
                    recorded  : true
                  });
              });
          });
  },
  _handleRecordClick: function () {
    var that = this;
    var video = React.findDOMNode(this.refs.video_stream);
    navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
          }).then(function(mediaStream) {
              webmRecorder = RecordRTC(mediaStream, {
                  type: 'video',
                  // recorderType: WhammyRecorder // force Whammy.js
              });

              wavRecorder = RecordRTC(mediaStream, {
                  type: 'audio',
                  recorderType: StereoAudioRecorder // force WebAudio for MS-Edge/Firefox/Chrome
              });

              webmRecorder.initRecorder(function() {
                  wavRecorder.initRecorder(function() {
                      webmRecorder.startRecording();
                      wavRecorder.startRecording();

                      video.src = URL.createObjectURL(mediaStream);
                      video.play();

                      setTimeout(that._handleStopClick, 8000);
                  });
              });
          }).catch(function(error) {
              console.error(error);
          });
  },

  _renderRecordPreview: function () {
    if (!this.state.recorded) {
      return React.DOM.div({ className: 'record__preview' },
        React.DOM.div({ onClick: this._handleRecordClick }, 'record'),
        React.DOM.video({ ref: 'video_stream' })
      )
    } else {
      return null;
    }
  },
  _renderRecordPlay: function () {
    if (this.state.recorded) {
      return React.DOM.div({ className: 'record__play' },
        React.DOM.div({ onClick: this._handlePlayClick }, 'play'),
        React.DOM.video({ ref: 'video_preview' }),
        React.DOM.audio({ ref: 'audio_preview' })
      );
    } else {
      return null;
    }
  },
  render: function () {
    return React.DOM.div(null,
      this._renderRecordPreview(),
      this._renderRecordPlay()
      );
  }
});
