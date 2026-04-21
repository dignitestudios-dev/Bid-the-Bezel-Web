"use client"
import Wallet from '@/components/icons/Wallet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import Badge from '../Badge'
import { useDeleteCard } from '@/features/billing/hook'
import { DeleteCardModal} from './delete-card-alert'

type Props = {
  card: Card;
  openInvoice: () => void;
}

const Card = ({card, openInvoice}: Props) => {
    const {mutate: deleteCard} = useDeleteCard(card._id)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
  return (
<>
                  

                    <div className="flex items-center justify-between py-2 border-b mb-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <Wallet />
                        </div>
                        <div>
                          <div className=" font-medium">{card?.brand} ● ● ● ● {card?.last4}</div>
                        </div>
                        {card?.default && (
                          <div>
                            <Badge color="bg-emerald-100 text-xs text-emerald-800">{card.default ? 'Default' : ''}</Badge>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setOpenDeleteModal(true)} >Delete </Button>
                    </div>

                    <div>
                      <div className=" font-medium mb-3">Invoices</div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left  border-collapse">
                          <thead>
                            <tr className="text-xs text-muted-foreground">
                              <th className="py-2">Date</th>
                              <th className="py-2">Total</th>
                              <th className="py-2">Status</th>
                              <th className="py-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="py-3">Oct 20 2025</td>
                              <td className="py-3">$18</td>
                              <td className="py-3">
                                <Badge color="bg-yellow-100 text-yellow-800">
                                  On Hold
                                </Badge>
                              </td>
                              <td className="py-3">
                                <button
                                  onClick={openInvoice}
                                  className="px-3 py-1 border rounded-md "
                                >
                                  View
                                </button>
                              </td>
                            </tr>

                            <tr className="border-t">
                              <td className="py-3">Oct 20 2025</td>
                              <td className="py-3">$200</td>
                              <td className="py-3">
                                <Badge color="bg-emerald-100 text-emerald-800">
                                  Paid
                                </Badge>
                              </td>
                              <td className="py-3">
                                <button
                                  onClick={openInvoice}
                                  className="px-3 py-1 border rounded-md "
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <DeleteCardModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} onBack={() => setOpenDeleteModal(false)}  cardId={card._id} />
              </>
  )
}

export default Card