import { render, screen } from '@testing-library/react';
import InfinityScroll from './infinity-scroll';

const mockIntersectionObserver = (isIntersecting: boolean) => {
	const observe = vi.fn();
	const disconnect = vi.fn();

	window.IntersectionObserver = class MockIntersectionObserver {
		constructor(callback: IntersectionObserverCallback) {
			callback(
				[{ isIntersecting }] as IntersectionObserverEntry[],
				this as unknown as IntersectionObserver,
			);
		}
		observe = observe;
		disconnect = disconnect;
		unobserve = vi.fn();
		takeRecords = vi.fn().mockReturnValue([]);
		root = null;
		rootMargin = '';
		thresholds = [];
	} as unknown as typeof IntersectionObserver;

	return { observe, disconnect };
};

describe('InfinityScroll', () => {
	it('children을 렌더링한다', () => {
		mockIntersectionObserver(false);
		render(
			<InfinityScroll onFetchMore={vi.fn()}>
				<p>아이템</p>
			</InfinityScroll>,
		);

		expect(screen.getByText('아이템')).toBeInTheDocument();
	});

	it('sentinel이 뷰포트에 들어오면 onFetchMore를 호출한다', () => {
		const onFetchMore = vi.fn();
		mockIntersectionObserver(true);

		render(
			<InfinityScroll onFetchMore={onFetchMore}>
				<p>아이템</p>
			</InfinityScroll>,
		);

		expect(onFetchMore).toHaveBeenCalled();
	});

	it('loading 중이면 onFetchMore를 호출하지 않는다', () => {
		const onFetchMore = vi.fn();
		mockIntersectionObserver(true);

		render(
			<InfinityScroll onFetchMore={onFetchMore} loading>
				<p>아이템</p>
			</InfinityScroll>,
		);

		expect(onFetchMore).not.toHaveBeenCalled();
	});

	it('disabled이면 onFetchMore를 호출하지 않는다', () => {
		const onFetchMore = vi.fn();
		mockIntersectionObserver(true);

		render(
			<InfinityScroll onFetchMore={onFetchMore} disabled>
				<p>아이템</p>
			</InfinityScroll>,
		);

		expect(onFetchMore).not.toHaveBeenCalled();
	});

	it('loading 중이면 loader를 렌더링한다', () => {
		mockIntersectionObserver(false);

		render(
			<InfinityScroll onFetchMore={vi.fn()} loading>
				<p>아이템</p>
			</InfinityScroll>,
		);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('커스텀 loader를 렌더링한다', () => {
		mockIntersectionObserver(false);

		render(
			<InfinityScroll onFetchMore={vi.fn()} loading loader={<span>로딩 중...</span>}>
				<p>아이템</p>
			</InfinityScroll>,
		);

		expect(screen.getByText('로딩 중...')).toBeInTheDocument();
	});
});
