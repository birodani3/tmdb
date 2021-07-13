import { animate, animateChild, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';

export const bouncySlider = ({ left, width }: { left: number; width: number }) => [
  group([
    animate('300ms cubic-bezier(.91, 0, .45, .87)', style({ left: `${left}px`, width: `${width}px` })),
    animate('300ms cubic-bezier(.91, 0, .45, .87)', keyframes([
      style({ transform: 'scale(1, 1)' }),
      style({ transform: 'scale(1.6, 0.3)' }),
      style({ transform: 'scale(1, 1)' }),
    ])),
  ])
];

export const appear = trigger('appear', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out',  style({ opacity: 1 }))
  ]),
  transition(':leave',  [
    style({ opacity: 1 }),
    animate('300ms ease-in', style({ opacity: 0 }))
  ])
]);

export const slideIn = trigger('slideIn', [
  transition('First => Second, First => Third, First => Fourth, Second => Third, Second => Fourth, Third => Fourth',  [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				right: 0,
				width: '100%',
			})
		]),
		query(':enter', [style({ right: '-100%', transform: 'rotate(6deg)', opacity: 1 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('.4s ease-out', style({ right: '100%', transform: 'rotate(-6deg)', opacity: 0 }))]),
			query(':enter', [
        animate('.4s ease-out', style({ right: 0, transform: 'rotate(0deg)' })),
        animate('.5s ease-out', style({ opacity: 1 }))
      ])
		]),
		query(':enter', animateChild())
	]),
	transition('Fourth => Third, Fourth => Second, Fourth => First, Third => Second, Third => First, Second => First', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
			})
		]),
		query(':enter', [style({ left: '-100%', transform: 'rotate(-6deg)', opacity: 1 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('.4s ease-out', style({ left: '100%', transform: 'rotate(6deg)', opacity: 0 }))]),
			query(':enter', [
        animate('.4s ease-out', style({ left: 0, transform: 'rotate(0deg)' })),
        animate('.5s ease-out', style({ opacity: 1 }))
      ])
		]),
		query(':enter', animateChild())
	])
]);
