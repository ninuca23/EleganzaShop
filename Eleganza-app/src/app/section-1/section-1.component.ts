import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-1',
  templateUrl: './section-1.component.html',
  styleUrl: './section-1.component.scss',
})
export class Section1Component implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.setupVideoLoop();
  }

  setupVideoLoop() {
    const video: HTMLVideoElement | null = this.videoPlayer.nativeElement;

    if (video) {
      video.addEventListener('timeupdate', () => {
        // Define the point in time when you want to restart the video (e.g., halfway through)
        const restartPoint = video.duration / 1.1; // Restart at halfway through the video

        // Check if the current time is near the restart point
        if (video.currentTime >= restartPoint) {
          // Restart the video
          video.currentTime = 0;
          video.play();
        }
      });

      // Add event listener for the 'ended' event
      video.addEventListener('ended', () => {
        // Restart the video when it ends
        video.currentTime = 0;
        video.play();
      });
    }
  }
}
