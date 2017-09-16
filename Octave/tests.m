% Time to test some signal processing stuff
pkg load signal;

fs = 44000;
recorder = audiorecorder(fs, 16, 1);

max_freq = 3000;
t = 0.1;

N = 2^nextpow2(fs*t);
cutoff = max_freq/fs*N;
x = fs*(0:cutoff-1)/N;
x = x';

last = 0;
last_count = 0;

while true
  recordblocking(recorder, t);
  data = getaudiodata(recorder);
  
  f = fft(data, N);
  p = abs(f(1:cutoff));
  
  [max_val, max_index] = max(p);
  found_freq = round(fs*max_index/N);
  key_num = round(12*log2(found_freq/440)+48);
  
  if key_num == last
    last_count += 1;
  else
    last_count = 0;
  end
  last = key_num;
  
  if last_count > 3
    title(key_num);
  else
    title('--');
  end
  
  drawnow;
end