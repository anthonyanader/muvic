% Time to test some signal processing stuff
pkg load signal;

fs = 44000;
recorder = audiorecorder(fs, 16, 1);

max_freq = 3000;
t = 5;

N = 2^nextpow2(fs*t);
cutoff = max_freq/fs*N;
x = fs*(0:cutoff-1)/N;
x = x';

%load('music.mat');
recordblocking(recorder, t);
data = getaudiodata(recorder);

% Samples in 42ms of data
ts = floor(fs*42/1000);

windows = 1:ts:fs*t-ts;
keys = zeros(numel(windows), 1);
index = 1;
for i = windows
  window = data(i:i+ts);
  f = fft(window, N);
  p = abs(f(1:cutoff));

  [max_val, max_index] = max(p);
  found_freq = round(fs*max_index/N);
  key_num = round(12*log2(found_freq/440)+48);
  
  keys(index) = key_num;
  index += 1;
end

plot((diff(keys) == 0) .* keys(2:end), 'b.', 'MarkerSize', 16)