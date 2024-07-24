build: convert join

convert:
	tsc

join:
	tic80 --fs="." --cmd="load tomogachi.png & import code bin/out.js & save & run"
