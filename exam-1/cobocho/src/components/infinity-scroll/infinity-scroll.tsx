import React, { useEffect, useRef, useCallback, useState } from 'react';

interface InfinityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
	onFetchMore: () => void;
	threshold?: number;
	loading?: boolean;
	loader?: React.ReactNode;
	disabled?: boolean;
}

const InfinityScroll = ({
	onFetchMore,
	loading = false,
	disabled = false,
	threshold = 0.8,
	loader = <DefaultLoader />,
	children,
	...rest
}: InfinityScrollProps) => {
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || loading || disabled) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) onFetchMore();
			},
			{ rootMargin: `0px 0px ${Math.round(threshold * 100)}% 0px` },
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [loading, disabled, onFetchMore, threshold]);

	return (
		<div {...rest}>
			{children}
			<div ref={sentinelRef} />
			{loading && (
				<div className="flex w-full justify-center py-4">{loader}</div>
			)}
		</div>
	);
};

const DefaultLoader = () => <span>Loading...</span>;

export default InfinityScroll;
