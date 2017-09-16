% Time to test some signal processing stuff
% Let's collect a sample
% Also, this looks neat: https://stackoverflow.com/questions/22583391/peak-signal-detection-in-realtime-timeseries-data

% 8Khz recording
y = record(5, 8000);

% Play the sample
player = audioplayer(y, 8000);
play(player);