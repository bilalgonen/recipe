import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { LINKS } from '../lib/links'
import { AboutDialog } from './AboutDialog'

beforeAll(() => {
  // jsdom doesn't implement <dialog> methods
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', '') }
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open') }
})

describe('AboutDialog', () => {
  it('shows the summary and links when open', () => {
    render(<AboutDialog open onClose={() => {}} />)
    expect(screen.getByRole('dialog', { name: 'About Recipe Box' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Live Demo/ })).toHaveAttribute('href', LINKS.demo)
    expect(screen.getByRole('link', { name: /Source/ })).toHaveAttribute('href', LINKS.source)
    expect(screen.getByRole('link', { name: /bilalgonen.com/ })).toHaveAttribute('href', LINKS.website)
  })
})
