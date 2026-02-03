export type TabType = {
  name: string
  component: React.ReactNode
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

type TabProps = {
  onClick?: () => void
  isActive?: boolean
} & TabType

const DesktopTab = ({ name, isActive, ...buttonProps }: TabProps) => {
  return (
    <button
      className="relative h-9 mx-2.5 transition-all cursor-pointer"
      style={
        {
          '--tab-bg-color': isActive
            ? 'var(--color-zinc-800)'
            : 'var(--color-zinc-700)',
          opacity: isActive ? 1 : 0.75,
        } as React.CSSProperties
      }
      {...buttonProps}
    >
      <div className="absolute w-5 h-9 bg-(--tab-bg-color) rotate-20 transform origin-top-left top-1" />
      <div className="absolute w-5 h-9 bg-(--tab-bg-color) -rotate-20 transform origin-top-right right-0 top-1" />
      <div className="absolute inset-0 rounded-md bg-(--tab-bg-color)" />
      {isActive && (
        <div className="absolute inset-0 rounded-md border border-zinc-600" />
      )}

      <span
        className={`${isActive ? 'text-white font-medium' : 'text-zinc-300'} whitespace-nowrap bg-(--tab-bg-color) z-10 relative mx-3 pb-4 text-sm`}
      >
        {name}
      </span>
    </button>
  )
}

type TabGroupProps = {
  tabs: TabType[]
  currentTab?: TabType
  setCurrentTab?: (tab: TabType) => void
  showTabs?: boolean
}

export const DesktopTabGroup = ({
  tabs,
  currentTab,
  setCurrentTab,
  showTabs,
}: TabGroupProps) => {
  return (
    <div className="absolute left-full top-2 rotate-90 transform origin-top-left hidden xs:block">
      <div
        className="flex gap-2 transition-transform duration-500"
        style={{
          transform: showTabs ? 'translateY(-100%)' : 'translateY(10px)',
        }}
      >
        {tabs?.map((tab) => (
          <DesktopTab
            key={tab.name}
            onClick={() => setCurrentTab?.(tab)}
            isActive={currentTab?.name === tab.name}
            {...tab}
          />
        ))}
      </div>
    </div>
  )
}

const MobileTab = ({
  name,
  isActive,
  icon: Icon,
  ...buttonProps
}: TabProps) => {
  return (
    <button
      className={`relative py-2 px-3 transition-all cursor-pointer rounded-lg ${isActive ? 'bg-zinc-700/50' : ''}`}
      {...buttonProps}
    >
      <Icon className={`h-6 w-6 mx-auto mb-1 ${isActive ? 'text-primary' : 'text-zinc-400'}`} />
      <span
        className={`${isActive ? 'text-white font-medium' : 'text-zinc-400'} whitespace-nowrap text-xs`}
      >
        {name}
      </span>
    </button>
  )
}

export const MobileTabGroup = ({
  tabs,
  currentTab,
  setCurrentTab,
}: TabGroupProps) => {
  return (
    <div className="mt-auto xs:hidden flex pt-4 pb-2 px-2 items-end justify-around bg-zinc-900/60 -mx-6 -mb-6 rounded-b-lg border-t border-zinc-700/50">
      {tabs?.map((tab) => (
        <MobileTab
          key={tab.name}
          onClick={() => setCurrentTab?.(tab)}
          isActive={currentTab?.name === tab.name}
          {...tab}
        />
      ))}
    </div>
  )
}
