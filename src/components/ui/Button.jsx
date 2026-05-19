const variants = {
  primary:
    'bg-accent text-white hover:bg-blue-600 shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.38)] active:scale-[0.97]',
  secondary:
    'bg-primary text-white hover:bg-gray-800 shadow-sm hover:shadow-md active:scale-[0.97]',
  outline:
    'bg-white text-primary border border-border shadow-sm hover:border-accent hover:text-accent hover:shadow-md active:scale-[0.97]',
  ghost:
    'bg-transparent text-dark-mid hover:text-accent active:scale-[0.97]',
  'outline-white':
    'bg-transparent text-white border border-white/20 hover:bg-white/10 active:scale-[0.97]',
  white:
    'bg-white text-primary shadow-sm hover:bg-accent hover:text-white hover:shadow-[0_4px_16px_rgba(59,130,246,0.38)] active:scale-[0.97]',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  children,
  disabled,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-[0.02em] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'

  const classes = [base, variants[variant] ?? variants.primary, sizeClasses[size] ?? sizeClasses.md, className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Tag type={Tag === 'button' ? type : undefined} disabled={disabled} onClick={onClick} className={classes} {...props}>
      {children}
    </Tag>
  )
}
