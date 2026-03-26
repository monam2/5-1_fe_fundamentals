import React, { useEffect, useRef } from 'react';

interface InfinityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
	onFetchMore: () => void;
	error?: boolean;
	onRetry?: () => void;
	loading?: boolean;
	disabled?: boolean;
}

const InfinityScroll = ({
	onFetchMore,
	onRetry,
	error,
	loading = false,
	disabled = false,
	children,
	...rest
}: InfinityScrollProps) => {
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || loading || disabled) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) onFetchMore();
		});

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [loading, disabled, onFetchMore]);

	return (
		<div {...rest}>
			{children}
			<div ref={sentinelRef} />
			{loading && (
				<div className="flex w-full justify-center py-4">Loading...</div>
			)}
			{error && onRetry && (
				<div className="flex w-full justify-center py-4">
					<button
						type="button"
						onClick={onRetry}
					>
						다시 시도
					</button>
				</div>
			)}
		</div>
	);
};

export default InfinityScroll;
