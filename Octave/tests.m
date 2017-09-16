% Time to test some signal processing stuff
% Let's collect a sample
% Also, this looks neat: https://stackoverflow.com/questions/22583391/peak-signal-detection-in-realtime-timeseries-data

pkg load signal;

% 8Khz 2 second recording of A4
% fs = 8000;
% t = 2;
% y = record(t, fs);
% save -mat A4.mat y

load('A4.mat');

length = 2^nextpow2(numel(y));
fs = 8000;
f = fft(y, length);
cutoff = floor(numel(f) / 2);
p = abs(f(1:cutoff));
x = fs*(0:cutoff-1)/length;
plot(x', p);

[pks, loc, extra] = findpeaks(p, 'DoubleSided');
hold on;
plot(fs*(loc .- 1)/length, pks, 'b.', 'MarkerSize', 20);
hold off;