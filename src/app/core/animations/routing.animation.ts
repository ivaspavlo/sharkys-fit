import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';


export const routingAnimations = trigger('triggerName', [
  transition('One => Two, Two => Three, One => Three', [
    style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				right: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ right: '-100%' })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('.4s ease-out', style({ right: '100%' }))]),
			query(':enter', [animate('.4s ease-out', style({ right: '0%' }))])
		]),
		query(':enter', animateChild())
  ]),
  transition('Three => Two, Two => One, Three => One', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
        height: '100%'
			})
		]),
		query(':enter', [style({ left: '-100%' })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('.4s ease-out', style({ left: '100%' }))]),
			query(':enter', [animate('.4s ease-out', style({ left: '0%' }))])
		]),
		query(':enter', animateChild())
	])
]);
